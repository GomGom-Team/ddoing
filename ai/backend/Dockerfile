#REF https://fastapi.tiangolo.com/deployment/docker/
FROM python:3.8.16

RUN pip install --no-cache-dir --upgrade -r requirements.txt

EXPOSE 8888

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8888"]