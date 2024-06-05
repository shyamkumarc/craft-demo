FROM apache/superset
# Switching to root to install the required packages
USER root
RUN pip install trino
# https://superset.apache.org/installation.html#database-dependencies
RUN pip install sqlalchemy-trino
# Switching back to using the `superset` user
USER superset
#Run below commands after superset has started and configured trino connector
ENV SUPERSET_SECRET_KEY=your_secret_key_here
RUN superset fab create-admin --username admin --firstname Superset --lastname Admin --email admin@superset.com --password admin
RUN superset db upgrade
RUN superset init