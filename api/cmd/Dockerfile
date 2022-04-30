FROM golang:1.16-alpine
WORKDIR /app
ENV APP_ENV="dev"
ADD go.* .
RUN go mod download
COPY . ./
EXPOSE 8080
RUN go build ./cmd/main.go 
CMD ["./main"]
