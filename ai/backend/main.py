import tensorflow as tf
from fastapi import FastAPI
from tensorflow.keras.applications import EfficientNetV2B0

app = FastAPI()
model = ''


@app.get("/")
async def root():
	return_dict = dict()

	return_dict['model'] = model.name

	return return_dict


@app.on_event("startup")
async def init_model():
	global model
	model_path = 'efficientnetv2-b0_model.h5'
	shape = (64, 64, 1)
	num_classes = 340
	#model_path = 'imagenet'
	#shape = (224, 224, 3)
	#num_classes = 1000
	print('load model start')
	with tf.device('/cpu:0'):
		model = EfficientNetV2B0(input_shape = shape, weights=model_path, classes=num_classes)

	print(f'model {model.name} load complete')
