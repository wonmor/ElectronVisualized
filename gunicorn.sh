#!/bin/sh
gunicorn --chdir app electron_visualized:app -w 2 --threads 2 -b 0.0.0.0:8000