#!/bin/bash
python -m uvicorn main:app --host 0.0.0.0 --port 9999 --reload