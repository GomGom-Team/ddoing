import os
import asyncio
import json
import requests
import urllib.request
from tqdm import tqdm

client_id = ""
client_secret = ""
global_path = 'images'
limit = 5

async def crawling_image_by_word(word : str):
    global limit
    global global_path
    encText = urllib.parse.quote(word)
    url = f"https://openapi.naver.com/v1/search/image?query={encText}&display={limit}" # JSON 결과
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",client_id)
    request.add_header("X-Naver-Client-Secret",client_secret)
    response = urllib.request.urlopen(request)
    rescode = response.getcode()
    if(rescode==200):
        response_body = response.read().decode('utf-8')
        # print(response_body.decode('utf-8'))
        result = json.loads(response_body)
        # print(result)
        os.makedirs(f'{global_path}/{word}', exist_ok=True)
        for idx, item in enumerate(result['items']):
            link = item['link']
            # print(f'{word} : {item["link"]}')
            response = None
            try:
                response = requests.get(item['link'])
                if response.status_code == 200:
                    with open(f'{global_path}/{word}/{word}_{idx}.jpg', 'wb') as f:
                        f.write(response.content)
            
            except:
                continue
    else:
        print("Error Code:" + rescode + " in " + {word})


if __name__ =="__main__":
    with open('classes.txt', 'r') as f:
        for word in tqdm(f, total=18):
            asyncio.run(crawling_image_by_word(word.rstrip('\n')))
    # asyncio.run(crawling_image_by_word('envelope'))
