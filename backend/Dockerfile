FROM golang:1.16-alpine
WORKDIR /app
ADD go.* .
RUN go mod download
COPY . ./
RUN go build -o /server
EXPOSE 8080
CMD [ "/server" ]

