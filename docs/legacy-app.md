Overview
========

The legacy app is used once a year to manage and track attendees to a company Christmas party. It has the following components:

1. A standalone importer that processes a CSV file and populates the database, then produces a new CSV file with the information needed to print the invitation cards
2. A simple public-facing web application to which invited guests are directed to submit their RSVP
3. A back-office javascript client application that tracks RSVPs (for event planning purposes)

The following sections describe each of the above components in more detail.

Importer
=========

The importer reads in the input CSV file and does the following with each row:

1.  Generates a unique *SLUG* for the guest:
    This is the portion at the end of the URL that makes it unique to each guest. It is usually one of the following:
	- lowercase preferred name
	- lowercase first name
	- lowercase first letter of first name + complete last name
	- lowercase first name + last name
	
	An algorithm determines which one to use. // TODO document this

2.  Generates a unique 3-digit confirmation code to be used by the guest when submitting their RSVP

3.  Creates a database record for the guest, including all generated information

At the end of the process, a new CSV file is produced which includes the original + generated information.

CSV file format
----------------
The same format is used for input and output but certain columns are ignored when processing the input file (because they are only relevant on the output).

- *Code:* a _generated_ and unique 3-digit code that will be used by the guest when submitting their RSVP online. Used as a form of authentication.
- *Clients:* the name of the guest's company or blank
- *Address:* address line 1
- *Address 2:* address line 2
- *City:*
- *State:*
- *Zip:*
- *Customer Invited:* invited guest's full name
- *Preferred Name:* invited guest's preferred name to be addressed with
- *Salesperson:* the employee name who invited the guest
- *Status:* has been blank in the past, but I believe this is meant to be an active/inactive flag
- *SLUG:* a _generated_ URL that's specific to the invited guest. This is where they are directed to submit their RSVP
- *MSLUG:* a _generated_ URL that's specific to the invited guest. This is where they are directed to submit their RSVP if using a mobile device (this is converted into a QR code)
- *Unique ID:* a _generated_ unique ID for the invited guest. This is usually the database primary key. (not sure if it's used by anything)

Public-facing application
==========================

The invited guest uses their unique URL, either the regular or mobile one, to access the RSVP page. On this page they provide the following information:

- Their unique 3-digit confirmation code
- A selection of whether or not they will attend the event
- A selection of whether or not they will bring a guest. If yes, the name of the additional guest is requested
- An email address where the confirmation email should be sent
- An optional note/comment

If the URL is revisited after the original submission, a thank you message is displayed to inform the guest that they have already responded and it also gives them the opportunity to change their RSVP details. In that case the original details will be pre-populated with the exception of the 3-digit confirmation code.

On the server, the following information is also captured in addition to the user-provided info:

Upon visiting the RSVP page:
- last IP address used
- a "visited" flag is set to true
- if the mobile URL was used, a "visitedFromMobile" flag is also set to true
- a timestamp of the first visit is captured (only captured on the first visit)

Upon submitting the RSVP:
- a "responded" flag is set to true
- if the mobile URL was used, a "respondedFromMobile" flag is also set to true

There is also validation to verify that the 3-digit confirmation code is the correct one for the guest, and also that a valid email is used.

Backoffice application
========================

// TODO

Current process for starting a new event
=========================================

// TODO

