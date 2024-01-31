FROM python:3
WORKDIR /flask_mongo
COPY . ./flask_mongo
# Copy the rest of the application code into the container
COPY . .
RUN ls
RUN chmod +x ./flask_mongo/start.sh

# Expose the port that your Flask app listens on
EXPOSE 5000

# Start the Flask app
CMD ["python", "app.py"]