import React from 'react'
import { useEffect, useState } from 'react'
import moment from 'moment'

const App = () => {

    const [eventArray, setEvents] = useState(null)


    useEffect(() => {
// fetch event data from api
      const fetchEvents = async () => {
            const response = await fetch('https://staging.national-ice-centre.com/api/events/read?token=eec0d0a7-cdd6-4fd7-94b9-b21fd6e99e92')
            const result = await response.json()
// if response ok then set eventArray to received result
            if(response.ok) {
// sort by event date for calendar
              let eventsArray = result.events
              eventsArray.sort(function(a,b){
                return new Date(a.dates[0].date) - new Date(b.dates[0].date)
              })
// set eventArray for mapping
                setEvents(eventsArray)
            }
        }
// call fetchEvents after declaring
        fetchEvents()
    }, [])

// display list of events
  return (
    <div className="Home">
      <div className='Header'>
      Upcoming Live Events at Motorpoint Arena Nottingham        
      </div>

{/*Mapping Events*/}
        <div className='events'>
          {eventArray && eventArray.map((item) => (
            <div className='eventContainer'>
{/*Each Event item is clickable to event details on main website*/}
              <a href={item.url}>
              <div className='eventImage'>
{/*Image for each event*/}
                <div>
                  <img className='eventImg' src={item.image} alt="Live Event at Motorpoint Arena Nottingham"/>
                </div>
              </div>

              <div className='eventDetails'>
{/*Event Title*/}
                <div className="eventTitle">
                  {item.name}
                </div>
{/*Map through all dates*/}                
              <div className='eventDateContainer'>  
                {item.dates.map((date) => (
                  <div className='eventPerformance'>
                    <div className='eventDate'>
{/*Change date format*/}
                      <div className='eventDateTop'>
                        {moment(date.date).format('ddd DD')}
                      </div>
                      <div className='eventDateBottom'>
                        {moment(date.date).format('MMM YYYY')}
                      </div>
{/*Display times*/}
                    </div>
                    <div className='eventTimes'>
                      <div className='eventDoors'>
{/*Display doors time if present from API, otherwise skip*/}
                        {'doors' in date ? `Doors: ${date.doors}` : null}
                      </div>
                      <div className='eventStart'>
                        Start: {date.start}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
            </a>  
          </div>
          ))}
        </div>
    </div>
  )
}

export default App;
