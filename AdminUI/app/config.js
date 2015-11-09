angular.module('rsvpApp')
.value('restConfig',{
    'baseURL': 'http://localhost:8000/api',
    'resources': {
        staff: '/rsvpAdmin/staff',
        invite: '/rsvpAdmin/invites',
        client: '/rsvpAdmin/contacts',
        event: '/rsvpAdmin/events'
    }
});