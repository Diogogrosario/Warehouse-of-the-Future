FROM python:3.10.1

WORKDIR /usr/src/app

COPY ./src/logic/requirements.txt .

RUN pip install -r requirements.txt

COPY ./src/logic/ .

CMD ["python","-u","server.py", "docker"]