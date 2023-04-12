import os
import json
import datetime as dt
from tqdm import tqdm
import pandas as pd
import numpy as np

def f2cat(filename: str)->str:
	return filename.split('.')[0]

# input_path = home_dir
# join_path = data_dir
class Simplified():
	def __init__(self, input_path='/home/jupyter-j8a103'):
		self.input_path = input_path
		self.data_dir = 'kaggle_quickdraw_dataset'

	def list_all_categories(self):
		files = os.listdir(os.path.join(self.input_path, self.data_dir))
		return sorted([ f2cat(f) for f in files ], key=str.lower)


	def read_training_csv(self, category, nrows=None, usecols=None, drawing_transform=False):
		df = pd.read_csv(
			os.path.join(self.input_path, self.data_dir, category + '.csv'), nrows=nrows, 
			parse_dates=['timestamp'], usecols=usecols
			)
		
		if drawing_transform:
			df['drawing'] = df['drawing'].apply(json.loads)

		return df


if __name__ == '__main__':
	NCSVS = 100 # num of csvs
	start = dt.datetime.now()
	
	s = Simplified()
	categories = s.list_all_categories()
	print(f'#categories : {len(categories)}')


	for y, category in tqdm(enumerate(categories)):
		df = s.read_training_csv(category, nrows=30000)
		df['y'] = y
		df['cv'] = (df.key_id // 10 ** 7) %NCSVS

		for k in range(NCSVS):
			filename = f'train_k{k}.csv'
			chunk = df[df.cv ==k]
			chunk = chunk.drop(['key_id'], axis=1)
			if y == 0 :
				chunk.to_csv(filename, index=False)
			else:
				chunk.to_csv(filename, mode='a', header=False, index=False)


	for k in tqdm(range(NCSVS)):
		filename = f'train_k{k}.csv'
		if os.path.exists(filename):
			df = pd.read_csv(filename)
			df['rnd'] = np.random.rand(len(df))
			df = df.sort_values(by='rnd').drop('rnd', axis=1)
			df.to_csv(filename+'.gz', compression='gzip', index=False)
			os.remove(filename)

	print(df.shape)
	end = dt.datetime.now()
	print('Latest run {}.\nTotal time {}s'.format(end, (end - start).seconds))