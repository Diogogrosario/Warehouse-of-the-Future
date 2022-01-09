FROM python:3.8

WORKDIR /tmp/genetic/logic

COPY ./src/logic/requirements.txt .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

ENTRYPOINT ["python3", "server.py", "docker"]