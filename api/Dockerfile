FROM google/dart:2.7.2

WORKDIR /resume
ADD resume/ ./

WORKDIR /app
ADD api/pubspec.* ./
RUN pub get --no-precompile
ADD api/ ./

WORKDIR /app
EXPOSE 8888

CMD pub global activate aqueduct \
    && aqueduct db upgrade \
    && dart bin/main.dart
