function FormErrorMessages({ messages }) {
  return (
    <ul>
      {messages.map((message, index) => (
        <li className="text-danger mb-2" key={message.field + message.message}>
          <strong>{message.field}:</strong> {message.message}
        </li>
      ))}
    </ul>
  );
}

export default FormErrorMessages;
