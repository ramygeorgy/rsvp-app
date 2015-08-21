angular.module('rsvpApp')
.value('restConfig',{
    'baseURL': 'http://localhost:8000/api',
    'resources': {
        staff: '/rsvpAdmin/staff',
        invite: '/rsvpAdmin/invite',
        contact: '/rsvpAdmin/contact',
        event: '/rsvpAdmin/events'
    }
});