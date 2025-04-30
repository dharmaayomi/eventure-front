"use client";

import { Location } from "@/types/location";

interface CreateEvent {
  categoryId: number;
  organizerId: number;
  name: string;
  desc: string;
  startDate: string;
  endDate: string;
  location: Location;
  thumbnail: string;
}

const CreateEventForm = () => {
  return (
    <div className="mt-30">
      <h1>Create New Event</h1>
      <form onSubmit={() => {}}>
        <div>
          <label htmlFor="categoryId">Category ID:</label>
          <input
            type="number"
            id="categoryId"
            name="categoryId"
            value=""
            onChange={() => {}}
            required
          />
        </div>
        <div>
          <label htmlFor="organizerId">Organizer ID:</label>
          <input
            type="number"
            id="organizerId"
            name="organizerId"
            value=""
            onChange={() => {}}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value=""
            onChange={() => {}}
            required
          />
        </div>
        <div>
          <label htmlFor="desc">Description:</label>
          <textarea
            id="desc"
            name="desc"
            value=""
            onChange={() => {}}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value=""
            onChange={() => {}}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value=""
            onChange={() => {}}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            name="location"
            value=""
            onChange={() => {}}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="thumbnail">Thumbnail:</label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value=""
            onChange={() => {}}
            required
          />
        </div>
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default CreateEventForm;
