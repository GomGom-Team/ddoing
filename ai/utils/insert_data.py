from tqdm import tqdm
import asyncio, pymysql
from datetime import datetime
from make_sentence import make_sentences, translate

def init_database():
    db = pymysql.connect(
        host='localhost', port=3306, user='', passwd='', db='gomgom', charset='utf8')
    return db

def generate_word_and_sentence(path: str):
    with open(path, 'r') as f:
        for word in f:
            word = word.rstrip('\n')
            mean = asyncio.run(translate(word))
            sentences = asyncio.run(make_sentences(word))
            yield word, mean, sentences



if __name__ == "__main__":
    print('hi')

    # read_classes('classes.txt')
    db = init_database()
    print(db)
    errors = []
    with db.cursor() as cursor:
        now = datetime.today().strftime("%Y-%m-%d %H:%M:%S")
        word_id = 254
        for word, mean, sentences in tqdm(generate_word_and_sentence('temp.txt'),
                                            total=340-word_id, 
                                            desc='Generate Sentences'):
            try:
                sql = f"insert into words(id, created_date, modified_date, mean, word) values ({word_id}, '{now}', '{now}', '{mean}', '{word}')"
                cursor.execute(sql)

                # word_id = cursor.execute(f'select id from words where word = {word}')

                for k,v in sentences.items():
                    sql = f"insert into sentences(created_date, modified_date, eng_sentence, ko_sentence, word_id) values ('{now}', '{now}', '{k}', '{v}', '{word_id}')"
                    cursor.execute(sql)

                db.commit()
            except:
                errors.append(word)
            
            word_id+=1

    db.close()

print(f'error list : {errors}')


# db = init_database()

# with db.cursor() as cursor:
#     sql = f'select id from words where id=1'
#     result = cursor.execute(sql)
#     print(result)
