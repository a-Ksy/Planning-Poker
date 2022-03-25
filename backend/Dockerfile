FROM golang:1.16-alpine
WORKDIR /app
ADD go.* .
RUN go mod download
RUN go get github.com/githubnemo/CompileDaemon
COPY . ./
EXPOSE 8080
ENTRYPOINT CompileDaemon --build="go build main.go" --command="./main"
