import cv2
import base64
import pickle
import numpy as np
import tensorflow as tf
from io import BytesIO
from PIL import Image
from typing_extensions import Annotated
from fastapi import FastAPI, File, UploadFile, Body, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.applications import EfficientNetV2B0

app = FastAPI()
model = ''
categories = ''

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'])


@app.get("/")
async def root():
	return_dict = dict()

	return_dict['model'] = model.name

	model.predict(np.zeros(shape=(1, 64, 64, 1)))
	return return_dict

@app.post("/inference")
async def inference(stage : Annotated[int, Form()] ,file : bytes = File()):
	global categories
	#file = str.encode(file)
	print(file[:50], type(file))
	file = base64.b64decode(file)

	img = Image.open(BytesIO(file))
	#print(img.shape)
	img = np.array(img)[:,:,1:]
	cv2.imwrite('test4.PNG', img)
	print(img.shape)
	img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	cv2.imwrite('test3.PNG', img)
        #padding = 10
        resize_ary = np.nonzero(img)
	min_max = [(np.min(resize_ary[i]), np.max(resize_ary[i])) for i in range(len(resize_ary))]
        min_x, max_x , min_y, max_y = min_max[0][0], min_max[0][1], min_max[1][0], min_max[1][1]
        img = img[min_x:max_x, min_y:max_y]
        img = cv2.resize(img, (64, 64))
	cv2.imwrite('test2.PNG', img)
	img = np.reshape(img, (64, 64, 1))
	cv2.imwrite('test1.PNG', img)
	result = model.predict(np.reshape(img, (1, 64, 64, 1)), batch_size=1)
	labels = np.argsort(-result, axis=1)[:, :3]
	return_dict = dict(stage=stage, results=dict())
	for label in np.squeeze(labels).tolist():
		print(label, result[:, label])
		return_dict['results'][categories[label]] =  result[:, label].item()
		#return_dict['results'][label] =  result[:, label].item()
	print(return_dict)
	return return_dict


@app.post('/test')
async def test_logic(stage : int, file : bytes = File(...)):
	
	#contents = await file.read()
	contents =base64.b64decode(file)
	pil_img = Image.open(BytesIO(contents))
	np_img = np.array(pil_img)

	result_dict = dict(state=stage, results=dict())
	result_dict['results']['test1'] = 0.5
	result_dict['results']['test2'] = 0.3
	result_dict['results']['test3'] = 0.2
	
	metadata = {"filename" : file.filename, "shape" : np_image.shape}
	headers= {"Content-Disposition" : "attachment", "filename": "image.png"}
	
	return FileResponse(ByteIO(contents), media_type='image/png', headers=headers, metadata=metadata, **result_dict)


@app.on_event("startup")
async def init_model():
	global model
	global categories
	model_path = 'efficientnetv2-b0_model.h5'
	shape = (64, 64, 1)
	num_classes = 340

        with open('class_pickle_db', 'rb') as f:
          categories = pickle.load(f)

	print('load model start')
	model = EfficientNetV2B0(input_shape = shape, weights=model_path, classes=num_classes)
	print(f'model {model.name} load complete')
	model.predict(np.zeros(shape=(1, 64, 64, 1)))
	print('model warm up complete')
