FROM python:3.8


WORKDIR /tmp/genetic/logic

COPY ./src/logic/requirements.txt .

RUN pip install -r requirements.txt

ENTRYPOINT ["python3", "logic.py", ">","output.txt"]

#ENTRYPOINT ["tail", "-f", "/dev/null"]