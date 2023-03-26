import cv2
import numpy as np
import tensorflow as tf
from fastapi import FastAPI, File, UploadFile
from tensorflow.keras.applications import EfficientNetV2B0

app = FastAPI()
model = ''


@app.get("/")
async def root():
	return_dict = dict()

	return_dict['model'] = model.name

	return return_dict

@app.post("/inference")
async def inference(file : UploadFile):
	encode_to_int = np.fromstring(file.file.read(), dtype=np.uint8)
	img = cv2.imdecode(encode_to_int, cv2.IMREAD_COLOR)
	img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	img = cv2.resize(img, (64, 64))
	img = np.reshape(img, (64, 64, 1))
	cv2.imwrite('test.PNG', img)
	result = model.predict(np.reshape(img, (1, 64, 64, 1)))
	result = np.argsort(-result, axis=1)[:, :3]
	return dict(result=np.squeeze(result).tolist())


@app.on_event("startup")
async def init_model():
	global model
	model_path = 'efficientnetv2-b0_model.h5'
	shape = (64, 64, 1)
	num_classes = 340
	print('load model start')
	with tf.device('/cpu:0'):
		model = EfficientNetV2B0(input_shape = shape, weights=model_path, classes=num_classes)

	print(f'model {model.name} load complete')