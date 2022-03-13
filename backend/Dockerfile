FROM golang:1.16-alpine
WORKDIR /app
COPY go.* ./
RUN go mod download
RUN go mod verify
COPY main.go ./
RUN go build -o /backend
EXPOSE 8080
CMD [ "/backend" ]

