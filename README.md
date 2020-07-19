# project-beats-api
An API server for Project: Beats.

## Core features
- Serves as the gateway for different API providers supported in Project: Beeats.
- Standardization of web request/response into a similar format across different API providers.

## Development progress
[https://trello.com/b/r5F7x62K/project-beats-api]

## Versions
### 0.6.0
#### New features
- Created a method in MapsetsFormatter for standardizing cursor response.
#### Improvements
- Increased timeout for mapset download route to 6 minutes.
#### Fixes
- Fixed osu! API not returning a valid format for mapset search cursor.

### 0.5.0
#### New features
- Added some routes for testing from the client side.
- Added provider value in AuthResponse data to give a context of the provider when using OAuth.
#### Changes
- Removed RequireLoginResponse.
- Removed refreshToken and expiresIn values in AuthResponse data.
- Changed UnsupportedResponse to a type of ErrorResponse.
- Changed the way cursor values are received by the MapsetsRequest.
- Made MapsetsRequest receive mapset id as a query parameter instead.
- Renaming of some responses.
- Capitalized ApiProviderType values due to JSON parsing issue in the client side.
#### Fixes
- Fixed cursor query param not being parsed correctly.
- Fixed Bloodcat's mapset search query params not being escaped correctly.

### 0.4.0
- Implemented "me" route for retrieving online information.
- Implemented Deeplink feature to send back OAuth response to the game.

### 0.3.0
#### New features
- Implemented mapset download for Bloodcat.
- Implemented mapset download for osu!.
#### Changes
- If there is a try/catch block in an endpoint handler, make all codes go inside the try block.

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