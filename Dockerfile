# Building Backend
FROM golang:alpine as launchpad-server

RUN apk add nodejs npm

WORKDIR /source
COPY . .
WORKDIR /source/pkg/view
RUN npm install
RUN npm run build
WORKDIR /source
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -buildvcs -o /dist ./pkg/cmd/main.go

# Runtime
FROM golang:alpine

COPY --from=launchpad-server /dist /launchpad/server

EXPOSE 8444

CMD ["/launchpad/server"]