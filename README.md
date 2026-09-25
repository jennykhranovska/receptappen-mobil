# Smaka – mobilapp

Smaka är en mobil receptapp byggd med React Native och Expo. Appen använder samma backend och receptdata som webbversionen av Smaka.

## Funktioner

I appen kan användaren:

- Visa alla recept
- Visa detaljer för ett recept
- Söka efter recept
- Lägga till nya recept
- Redigera befintliga recept
- Radera recept
- Lägga till och ta bort bilder

Sökningen sker lokalt bland de recept som hämtats från API:t och söker bland receptets namn, ingredienser och kategori.

## Teknik

Projektet är byggt med:

- React Native
- Expo
- Expo Router
- TypeScript

Backend är ett separat ASP.NET Core Web API och mobilappen hämtar och ändrar recept via API-anrop.

## Installation

Klona projektet och installera dependencies:

```bash
npm install
```

Backend behöver vara startad innan mobilappen kan hämta recept.

API:t används på:

```text
http://localhost:5008
```

Starta sedan Expo:

```bash
npm start
```

eller:

```bash
npx expo start
```

## Android-emulator

När appen körs i en Android-emulator behöver emulatorn kunna nå backend som körs på datorns `localhost`.

Kör därför:

```bash
adb reverse tcp:5008 tcp:5008
```

Starta därefter appen i Android-emulatorn.

Om Expo-utvecklingsservern inte kan nås från emulatorn kan även följande behövas:

```bash
adb reverse tcp:8081 tcp:8081
```

## Backend

Backend för Smaka finns i ett separat repository:

https://github.com/jennykhranovska/receptappen-api
