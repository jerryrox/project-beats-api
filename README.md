# project-beats-api
An API server for Project: Beats.

## Core features
- Serves as the gateway for different API providers supported in Project: Beeats.
- Standardization of web request/response into a similar format across different API providers.

## Development progress
[https://trello.com/b/r5F7x62K/project-beats-api]

## Versions
### 0.3.0 (WIP)
#### New features

### 0.2.0
#### New features
- Implemented mapset searching routes for osu! and Bloodcat.
- Established a common interface for translating data between pb-api and different API providers.
#### Changes
- Message for UnsupportedResponse.
- Removed oauthState variable in AuthRequest.

### 0.1.0
#### New features
- Defined standard API request format.
- Defined standard API response format.
- Implemented osu! authentication route.