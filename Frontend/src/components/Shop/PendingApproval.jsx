const PendingApproval = () => {
    return (
      <div className="w-full h-screen grid place-items-center">
        <div className="text-red-500 text-2xl">
        <h2>Your account is pending approval from the admin.</h2>
        <p>Please wait until your account is activated.</p>
        </div>
      </div>
    );
  };
  
  export default PendingApproval;
  