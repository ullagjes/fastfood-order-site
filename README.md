This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Dependencies
next
firebase
styled components
reflexbox
nookies
react-hook-form
@hookform/resolvers
yup

## Description

A simple app that allows a user to order food on an app.

The menu is rendered based on existing data in Firestore.

When a user orders a burger, the order is sent into Firestore database.

The Kitchen can see the incoming order, and update it either to ready or collected.

The app also has a page that can be displayed on a screen, showing in realtime when an order is registered and ready to collect. 
