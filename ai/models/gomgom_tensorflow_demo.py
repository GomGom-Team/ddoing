import os
import json
import requests
import datetime as dt
import matplotlib.pyplot as plt
import cv2
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.layers import Conv2D, MaxPooling2D
from tensorflow.keras.layers import Dense, Dropout, Flatten, Activation
from tensorflow.keras.metrics import categorical_accuracy, top_k_categorical_accuracy, categorical_crossentropy
from tensorflow.keras.models import Sequential
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.applications import MobileNet, EfficientNetB0, regnet
from tensorflow.keras.applications.efficientnet_v2 import EfficientNetV2B0
from workspace.Utils.draw import df_to_image_array_xd, image_generator_xd
from workspace.Utils.data_shuffle import f2cat, Simplified
from workspace.metrics import top_3_accuracy
#for device log
#from tensorflow.python.client import device_lib
#device_lib.list_local_devices()

start = dt.datetime.now()
# s in list_all_categories
s = Simplified()

RAND_SEED = 1987
np.random.seed(seed=RAND_SEED)
tf.random.set_seed(seed=RAND_SEED)

INPUT_DIR = 'kaggle_quickdraw_dataset/'
DP_DIR = INPUT_DIR + 'train_csv/'
LOG_DIR = f'logs/{dt.datetime.now().strftime("%Y%m%d-%H%M%S")}'
BASE_IMG_SIZE = 256
NCSVS = 100
NCATS = 340
STEPS = 800
EPOCH = 16
size = 64
batch_size = 680

#model = MobileNet(input_shape=(size, size, 1), alpha=1., weights=None, classes=NCATS)
#model = EfficientNetB0(input_shape=(size, size, 1), weights=None, classes=NCATS)
#model = EfficientNetV2B0(input_shape=(size, size, 1), weights=None, classes=NCATS)
model = regnet.RegNetX004(input_shape=(size, size, 1), weights=None, classes=NCATS)
model_type = model.name
model.compile(
    optimizer=Adam(learning_rate=0.002), loss='categorical_crossentropy'
    , metrics = [categorical_crossentropy, categorical_accuracy, top_3_accuracy]
)
print(model.summary())

valid_df = pd.read_csv(os.path.join(DP_DIR, f'train_k{NCSVS-1}.csv.gz'), nrows=34000)

x_valid = df_to_image_array_xd(valid_df, size, BASE_IMG_SIZE, MODEL_TYPE=model_type)
y_valid = keras.utils.to_categorical(valid_df.y, num_classes=NCATS)
print(x_valid.shape, y_valid.shape)
print(f'Validation array memory {x_valid.nbytes/1024.**3:.2f} GB')

train_data = image_generator_xd(size, batch_size, range(NCSVS -1), DP_DIR, BASE_IMG_SIZE, NCATS, MODEL_TYPE=model_type)

tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=LOG_DIR, histogram_freq=1)

callbacks = [
    ReduceLROnPlateau(
        monitor='val_top_3_accuracy', factor=0.75, patience=3, 
        min_delta=0.001, mode='max', min_lr=1e-5, verbose=1
    ),
    ModelCheckpoint(
        f'{model_type}_model.h5', monitor='val_top_3_accuracy', mode='max',
        save_best_only=True, save_weights_only=True
    ),
	tensorboard_callback,
]

hists = []

hist = model.fit_generator(
    train_data, steps_per_epoch=STEPS, epochs=70, verbose=1,
    validation_data=(x_valid, y_valid), callbacks=callbacks
)

hists.append(hist)

headers = {'Content-Type': 'application/json','Charset' : 'UTF-8'}
values = dict()
values['text'] = f'model {model.name} training done'

values = json.dumps(values, ensure_ascii=False).encode('utf8')
response = requests.post('https://meeting.ssafy.com/hooks/9ph1badqz38k7f16y7c4xbwgny', headers=headers, data=values)
