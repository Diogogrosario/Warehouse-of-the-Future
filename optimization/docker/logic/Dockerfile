FROM python:3.8

WORKDIR /tmp/genetic/logic/

COPY ../../src/logic .

RUN "pip install -r requirements.txt"

ENTRYPOINT ["python3", "logic.py", ">","output.txt"]