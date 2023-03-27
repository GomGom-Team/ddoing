import pymysql
import asyncio
from tqdm import tqdm
from make_sentence import make_sentences, translate

def init_database():
    db = pymysql.connect(
        host='localhost.com', port=3306, user='', passwd='', db='gomgom', charset='utf8')
    return db

def read_classes(path: str):
    with open(path, 'r') as f:
        for word in f:
            word = word.rstrip('\n') 
            word_mean = asyncio.run(translate(word))
            sentences = asyncio.run(make_sentences(word))



if __name__ == "__main__":
    print('hi')

    # result = asyncio.run(make_sentences('apple'))
    # print(result)
    read_classes('classes.txt')