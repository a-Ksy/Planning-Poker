FROM golang:1.16-alpine
WORKDIR /app
ENV APP_ENV="dev"
ENV JWT_KEY="A?D(G+KbPeShVmYq3t6w9y$B&E)H@McQfTjWnZr4u7x!A%C*F-JaNdRgUkXp2s5v"
ENV CLIENT_URL="http://localhost:3000"
ADD go.* .
RUN go mod download
COPY . ./
EXPOSE 8080
RUN go build ./cmd/main.go 
CMD ["./main"]
