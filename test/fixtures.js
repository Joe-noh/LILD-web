export function buildDream() {
  return {
    id: '01D9MSFGYCDTBAQ0WZ6NDK3H03',
    date: '2019-04-29',
    body: 'It was so terrible.',
    draft: false,
    secret: false,
    tags: [ buildTag() ],
    user: buildUser()
  }
}

export function buildTag() {
  return {
    id: '01D9JBRQXTGGC90MXXBVDB32S0',
    name: 'nightmare'
  }
}

export function buildUser() {
  return {
    id: '01D68P3G3JMDM7XX4S08ZQ5967',
    avatar_url: 'https://lh6.googleusercontent.com/-1VeOnqJrHMQ/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rftvDAV7QpclrOy-rTXzYvlUfDXdQ/s96-c/photo.jpg',
    name: 'Joe Honzawa'
  }
}
