# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the contents of the 'container' directory to the '/app/container' directory in the container
COPY container /app/container

# Install any needed packages specified in requirements.txt
RUN pip install fastapi uvicorn pandas numpy scikit_learn

# Expose the port number that the FastAPI app will run on
EXPOSE 8000

# Command to run the FastAPI app within the Docker container
CMD ["uvicorn", "container.server:app", "--host", "0.0.0.0", "--port", "8000"]
