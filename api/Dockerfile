FROM google/dart:2.7.2

WORKDIR /app
ADD pubspec.* ./
RUN pub get --no-precompile
RUN pub global activate aqueduct
ADD . ./

WORKDIR /resume
ADD resume/ ./

WORKDIR /app
EXPOSE 8888

CMD aqueduct db upgrade \
    && dart bin/main.dart
