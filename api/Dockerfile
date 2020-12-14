FROM google/dart:2.10.4

WORKDIR /app
ADD pubspec.* ./
RUN pub get --no-precompile
ADD . ./
RUN pub get --offline --no-precompile

WORKDIR /resume
ADD resume/ ./

WORKDIR /app
EXPOSE 8888

CMD dart bin/main.dart
