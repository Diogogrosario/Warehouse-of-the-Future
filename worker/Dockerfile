FROM python:3.8-slim-buster

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

ADD ../backend/api /app/

COPY . .

CMD [ "python3", "-m", "worker" ]
EXPOSE 8080