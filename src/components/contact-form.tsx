import { Button } from "@/components/ui/button";

const ContactForm = () => (
  <form
    className="space-y-4"
    onSubmit={(e) => {
      e.preventDefault();
      console.log("Form submitted");
    }}
  >
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
      </label>
    </div>
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email
        <input
          type="text"
          id="name"
          name="name"
          className="focus:ring-opacity/50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
        />
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="focus:ring-opacity/50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
      />
    </div>
    <div>
      <label
        htmlFor="message"
        className="block text-sm font-medium text-gray-700"
      >
        Message
      </label>
      <textarea
        id="message"
        name="message"
        rows={3}
        className="focus:ring-opacity/50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
      />
    </div>
    <Button type="submit">Send Message</Button>
  </form>
);
export default ContactForm;
