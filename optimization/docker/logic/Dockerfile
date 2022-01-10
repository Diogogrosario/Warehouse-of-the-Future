FROM python:3.8

WORKDIR /usr/src/app

COPY ./src/logic/ .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

CMD ["python","-u","server.py", "docker"]