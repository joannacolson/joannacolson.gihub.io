<?php
if(isset($_POST['email'])) {

    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "hello@joannacolson.com";
    $email_subject = "Website Form Submission";

    // function died($error) {
    //     // your error code can go here
    //     echo "We are very sorry, but there were error(s) found with the form you submitted. ";
    //     echo "These errors appear below.<br /><br />";
    //     echo $error."<br /><br />";
    //     echo "Please go back and fix these errors.<br /><br />";
    //     die();
    // }

    // validation expected data exists
    // if(!isset($_POST['name']) ||
    //     !isset($_POST['title']) ||
    //     !isset($_POST['email']) ||
    //     !isset($_POST['company']) ||
    //     !isset($_POST['subject']) ||
    //     !isset($_POST['message'])) {
    //     died('We are sorry, but there appears to be data missing from the form you submitted.');
    // }

    $name = $_POST['name']; // required
    $title = $_POST['title']; // required
    $email_from = $_POST['email']; // required
    $company = $_POST['company']; // required
    // $subject = $_POST['subject']; // required
    $message = $_POST['message']; // required

  //   $error_message = "";
  //   $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

  // if(!preg_match($email_exp,$email_from)) {
  //   $error_message .= 'The Email address you entered does not appear to be valid.<br />';
  // }

  //   $string_exp = "/^[A-Za-z .'-]+$/";

  // if(!preg_match($string_exp,$name)) {
  //   $error_message .= 'The Name you entered does not appear to be valid.<br />';
  // }

  // if(strlen($message) < 2) {
  //   $error_message .= 'The Message you entered does not appear to be valid.<br />';
  // }

  // if(strlen($error_message) > 0) {
  //   died($error_message);
  // }

    // In case any of our lines are larger than 70 characters, we should use wordwrap()
    $message = wordwrap($message, 60, "\r\n");

    $email_message = "Form details below:\n\n";

    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
      }

    $email_message .= "Name: ".clean_string($name)."\n";
    $email_message .= "Title: ".clean_string($title)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Company: ".clean_string($company)."\n";
    // $email_message .= "Subject: ".clean_string($subject)."\n";
    $email_message .= "Message: ".clean_string($message)."\n";

    // Additional headers. When sending an email, it must contain a From header
    $headers = 'From: ' . $email_from . "\r\n" .
    'Reply-To: ' . $email_from . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

    // Send
    mail($email_to, $email_subject, $email_message, $headers);
    ?>

    <script>
      // Go to the thank you page to show it to the user
      window.location.href = "../thankyou.html";
    </script>

<?php
}
?>
