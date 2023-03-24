import os
import cv2
import json
import numpy as np
import pandas as pd
from keras.utils import to_categorical
from tensorflow.keras.applications.mobilenet import preprocess_input

#lw : line width
def draw_cv2(raw_strokes, BASE_IMG_SIZE, size=256, lw=6, time_color=True):
	img = np.zeros((BASE_IMG_SIZE, BASE_IMG_SIZE), np.uint8)
	for t, stroke in enumerate(raw_strokes):
		for i in range(len(stroke[0])-1):
			color = 255 - min(t, 10) * 13 if time_color else 255
			_ = cv2.line(img, (stroke[0][i], stroke[1][i]), (stroke[0][i+1], stroke[1][i+1]), color, lw)

	if size != BASE_IMG_SIZE:
		return cv2.resize(img, (size, size))

	return img

#DP_DIR : splited datas
#NCAT : #categories
def image_generator_xd(size, batchsize, ks, DP_DIR, BASE_IMG_SIZE, NCAT, lw=6, time_color=True, MODEL_TYPE='MobileNet'):
	while True:
		for k in np.random.permutation(ks):
			filename = os.path.join(DP_DIR, f'train_k{k}.csv.gz')
			for df in pd.read_csv(filename, chunksize=batchsize):
				df['drawing'] = df['drawing'].apply(json.loads)
				x = np.zeros((len(df), size, size, 1))
				for i, raw_strokes in enumerate(df.drawing.values):
					x[i, :, :, 0] = draw_cv2(raw_strokes, BASE_IMG_SIZE, size=size, lw=lw, time_color=time_color)
				x = preprocess_input(x).astype(np.float32) if MODEL_TYPE == 'MobileNet' else x
				y = to_categorical(df.y, num_classes=NCAT)
				yield x,y


def df_to_image_array_xd(df, size, BASE_IMG_SIZE, lw=6, time_color=True, MODEL_TYPE='MobileNet'):
	df['drawing'] = df['drawing'].apply(json.loads)
	x = np.zeros((len(df), size, size, 1))
	for i, raw_strokes in enumerate(df.drawing.values):
		x[i, :, :, 0] = draw_cv2(raw_strokes, BASE_IMG_SIZE, size=size, lw=lw, time_color=time_color)
	x = preprocess_input(x).astype(np.float32) if MODEL_TYPE =='MobileNet' else x
	return x
