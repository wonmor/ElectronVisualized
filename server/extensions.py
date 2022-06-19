# SQLAlchemy is designed to accommodate developers with a easy-to-use database model
from flask_sqlalchemy import SQLAlchemy

import os
import boto3
from boto3.s3.transfer import TransferConfig

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
aws_access_key_id = os.environ.get("AWS_ACCESS_KEY_ID")
aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
region_name = os.environ.get("AWS_DEFAULT_REGION")

session = boto3.Session(
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=region_name
)

s3_resource = boto3.resource('s3')

config = TransferConfig(multipart_threshold=1024 * 25, 
                        max_concurrency=10,
                        multipart_chunksize=1024 * 25,
                        use_threads=True)

BUCKET_NAME='electronvisualized'

def multipart_upload_boto3(key, file_path):
    s3_resource.Object(BUCKET_NAME, key).upload_file(file_path,
                            ExtraArgs={'ContentType': 'application/json'},
                            Config=config
                            )

def multipart_download_boto3(key, file_path):
    s3_resource.Object(BUCKET_NAME, key).download_file(file_path,
                            Config=config
                            )