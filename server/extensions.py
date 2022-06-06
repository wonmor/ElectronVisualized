# SQLAlchemy is designed to accommodate developers with a easy-to-use database model
from flask_sqlalchemy import SQLAlchemy

'''
╭━━━┳━╮╭━┳━━━━┳━━━┳━╮╱╭┳━━━┳━━┳━━━┳━╮╱╭┳━━━╮
┃╭━━┻╮╰╯╭┫╭╮╭╮┃╭━━┫┃╰╮┃┃╭━╮┣┫┣┫╭━╮┃┃╰╮┃┃╭━╮┃
┃╰━━╮╰╮╭╯╰╯┃┃╰┫╰━━┫╭╮╰╯┃╰━━╮┃┃┃┃╱┃┃╭╮╰╯┃╰━━╮
┃╭━━╯╭╯╰╮╱╱┃┃╱┃╭━━┫┃╰╮┃┣━━╮┃┃┃┃┃╱┃┃┃╰╮┃┣━━╮┃
┃╰━━┳╯╭╮╰╮╱┃┃╱┃╰━━┫┃╱┃┃┃╰━╯┣┫┣┫╰━╯┃┃╱┃┃┃╰━╯┃
╰━━━┻━╯╰━╯╱╰╯╱╰━━━┻╯╱╰━┻━━━┻━━┻━━━┻╯╱╰━┻━━━╯
'''

# Set up the database
db = SQLAlchemy()

# From here, Flask is linked with the AWS S3 server with the credentials defined as environmental variables...
import os
import boto3

aws_access_key_id = os.environ.get("AWS_ACCESS_KEY_ID")
aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
aws_session_token = os.environ.get("AWS_SESSION_TOKEN")

s3 = boto3.client('s3',
                    aws_access_key_id=aws_access_key_id,
                    aws_secret_access_key=aws_secret_access_key,
                    aws_session_token='secret token here'
                     )

BUCKET_NAME='electronvisualized'