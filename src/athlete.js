import { gallery } from './gallery.js'

const athlete = {
  "first": "Anže",
  "last": "Mošnik",
  "contacts": {
    "instagram": "https://www.instagram.com/anze_mosnik/",
    "strava": "https://www.strava.com/athletes/97113875",
    "email": "a.anzemosnik@gmail.com"
  },
  "tag": "Slovenija · Trail tek",
  "bio": "Anže Mošnik je slovenski trail tekač. Zmagal je na 50-kilometrski preizkušnji Ultra Trail Savinja, tekmoval pa je tudi na Eiger Ultra Trailu.",
  "trail": {
    "title": "Trail tek",
    "intro": "Anže Mošnik je slovenski trail tekač. Tekmoval je na različnih razdaljah, med drugim na 50-kilometrski preizkušnji v Savinjski dolini in na Eiger Ultra Trailu.",
    "stats": [
      [
        "3. mesto",
        "Knap Trail, T’ Sredna · 2026",
        "3:02:46 · med moškimi"
      ],
      [
        "10. mesto",
        "Soča 25 KM · 2026",
        "2:42:02"
      ],
      [
        "24. mesto",
        "Kriška Gora Trail · Muflon · 2026",
        "3:19:09"
      ],
      [
        "39. mesto",
        "Julian Alps Trail Run · Sky Trail 50K · 2025",
        "6:09:54 · 50 km · 2.700 m+"
      ],
      [
        "44. mesto",
        "Eiger Ultra Trail · E101 · 2025",
        "9:16:18"
      ],
      [
        "9. mesto",
        "Soča 25 KM · 2025",
        "2:33:25"
      ],
      [
        "1. mesto",
        "Ultra Trail Savinja 50 km · 2025",
        "5:49:47"
      ],
      [
        "32. mesto",
        "UTVV Legionar 30 km · 2025",
        "3:32:59"
      ],
      [
        "203. mesto",
        "Julian Alps Trail Run · Sky Trail 50K · 2024",
        "7:54:48 · 54,6 km · 2.456 m+"
      ],
      [
        "222. mesto",
        "Julian Alps Trail Run · Sky Trail 60K · 2022",
        "10:01:18 · 56,6 km · 2.384 m+"
      ]
    ],
    "source": "https://utmb.world/runner/4713512.anze.mosnik"
  }
}
athlete.trail.gallery = gallery
export default athlete
