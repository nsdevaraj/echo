const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const account = {host: 'smtp.sendgrid.net', port: 587, user: 'apikey', pass: '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', secure: false}
//const account = {host: 'smtp.gmail.com', port: 587, user: 'vbxnoreply@gmail.com', pass: 'FireBase@2018', secure: false}
const trail = {email: process.argv[4], user: process.argv[6], key: process.argv[2], date: process.argv[3], version: process.argv[5] ,lastName: process.argv[7]?process.argv[7]:''}
console.log(trail)
trail.fileName = process.argv[4].replace(/@/g,'-').replace(/\./g,'-')
const signedUrlExpireSeconds = 7*24*60*60; //link expiry in seconds
//visualbi-dms-codestore
const awsConfig = {Bucket: 'visualbi-vbx-autoinstall-codestore', accessKeyId: 'AKIAJ2HJMVPT5ZTQPU6Q', secretAccessKey: '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', region: 'us-east-2'}
fs.renameSync('updatesite/target/VBISuite-1.0.0.qualifier.zip',`updatesite/target/VBX_SUITE_LD_${trail.version}_${trail.fileName}.zip`);
console.log('Rename done:'+trail.user)
//configuring the AWS environment 
AWS.config.update({
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
    signatureVersion: 'v4',
    region: awsConfig.region
  });
const s3 = new AWS.S3();
//configuring parameters
const fullLocation = path.basename(`updatesite/target/VBX_SUITE_LD_${trail.version}_${trail.fileName}.zip`)
console.log(fullLocation)
const uploadParams = {
  Bucket: awsConfig.Bucket,
  Body : fs.createReadStream(`updatesite/target/VBX_SUITE_LD_${trail.version}_${trail.fileName}.zip`),
  Key : `VBX_SUITE_LD_${trail.version}_${trail.fileName}.zip`
};
s3.upload(uploadParams, function (err, data) {
    if (err) {
        console.log("Error", err);
    }
    if (data) {
        console.log("Uploaded in:", data.Location);
        const downloadParams = {
            Bucket: awsConfig.Bucket,
            Key: fullLocation,
            Expires: signedUrlExpireSeconds
        };
        const signedUrl = s3.getSignedUrl('getObject', downloadParams);
        nodemailer.createTestAccount((err) => {
            let transporter = nodemailer.createTransport({
                host: account.host,
                port: account.port,
                secure: account.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
            const mailOptions = {
                from: '"Visual BI Solutions" <no-reply@visualbi.solutions>', // sender address
                to: trail.email, // list of receivers
                replyTo: 'dsx-support@visualbi.com',		
				bcc: 'product-registration@visualbi.com',
                subject: 'Visual BI Extensions for SAP Lumira Designer - 15 Days Trial', // Subject line
                text: 'Enable HTML to view the message', // plain text body
			html: `<div style="background-color:#f7f7f7; width:100%; margin:0; padding:70px 0 70px 0"> <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%"> <tbody> <tr> <td align="center" valign="top"> <p style="margin-top:0"><img data-imagetype="External" src="https://products.visualbi.com/wp-content/uploads/visualbi-logo.png" alt="Visual BI Solutions" style="border:none; display:inline; font-size:14px; font-weight:bold; height:auto; line-height:100%; outline:none; text-decoration:none; text-transform:capitalize"></p> <table border="0" cellpadding="0" cellspacing="0" width="600" id="x_template_container" style="-webkit-border-radius:6px!important; border-radius:6px!important; background-color:#ffffff; border:1px solid #dedede"> <tbody> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="600" id="x_template_header" bgcolor="#26aee1" style="background-color:#26aee1; color:#ffffff; border-top-left-radius:6px!important; border-top-right-radius:6px!important; border-bottom:0; font-family:Arial; font-weight:bold; line-height:100%; vertical-align:middle; border-radius:3px 3px 0 0!important"> <tbody> <tr> <td> <p style="color: rgb(255, 255, 255); margin: 0px; padding: 28px 24px; display: block; font-family: Arial, serif, EmojiFont; font-weight: bold; text-align: center; line-height: 150%; font-size: 20px !important;"> Thank you for your interest in our Visual BI Extensions for SAP Lumira Designer</p> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="600" id="x_template_body"> <tbody> <tr> <td valign="top" style="background-color:#ffffff; -webkit-border-radius:6px!important; border-radius:6px!important"> <table border="0" cellpadding="20" cellspacing="0" width="100%"> <tbody> <tr> <td valign="top"> <div style="color: rgb(99, 99, 99); font-family: Arial, serif, EmojiFont; font-size: 14px; line-height: 150%; text-align: left;"> <div style="text-align:justify"> <p>Dear <strong>${trail.user},</strong></p> <p>Thank you for your interest in our Visual BI Extensions for SAP Lumira Designer/Design Studio.</p> <p><a href="${signedUrl}" target="_blank" rel="noopener noreferrer" style="color:#26aee1; font-weight:normal; text-decoration:underline">Click here</a> to download your 15 days trial version of the latest Visual BI Extensions for SAP Lumira Designer.</p> <p><strong>Your license has been registered with the following details:</strong></p> <p><strong>Licensee:</strong> Visual BI Solutions<br> </p> <table border="1" style="table-layout:fixed; width:100%; border-collapse:collapse; text-align:center; color:black"> <tbody> <tr> <td colspan="4"><strong>License Details</strong></td> </tr> <tr> <th><strong>Name</strong></th> <th><strong>eMail</strong></th> <th><strong>Product</strong></th> <th><strong>License Key</strong></th> </tr> <tr> <td style="word-wrap:break-word">${trail.user} ${trail.lastName}</td> <td style="word-wrap:break-word">${trail.email}</td> <td style="word-wrap:break-word">VBX Suite</td> <td style="word-wrap:break-word">${trail.key}</td> </tr> <tr> </tr> <tr> </tr> </tbody> </table> <br><p><strong>Where to find more information?</strong></p> <p>Here are some additional links for you:</p> <ul> <li>Documentation for Visual BI Extensions for SAP Lumira Designer - check <a href="http://products.visualbi.com/vbx/downloads#documentation" target="_blank" rel="noopener noreferrer" style="color:#26aee1; font-weight:normal; text-decoration:underline">here</a>. </li></ul> <p><strong>Need help to get started?</strong></p> <p>If you\'re having trouble getting started, don\'t hesitate to reach out to our experts through our help desk - <a href="http://support.visualbi.com" target="_blank" rel="noopener noreferrer" style="color:#26aee1; font-weight:normal; text-decoration:underline">http://support.visualbi.com</a> A separate email with login information to our support system has been emailed to you as well. If you have not received it, please write to us at <a href="mailto:support@visualbi.com" target="_blank" rel="noopener noreferrer" style="color:#26aee1; font-weight:normal; text-decoration:underline">support@visualbi.com</a></p> <p>Thank you for your interest and we are looking forward to hear back from you.<br> Your Visual BI Solutions Team.</p> </div> </div> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" valign="top"> <table border="0" cellpadding="10" cellspacing="0" width="600" id="x_template_footer" style="border-top:0; -webkit-border-radius:6px"> <tbody> <tr> <td valign="top" style="padding:0; -webkit-border-radius:6px"> <p style="font-size:10px; color:#737373; text-align:justify">This e-mail may contain privileged, undisclosed, or otherwise confidential information. If you have received this e-mail in error, you are hereby notified that any review, copying, or distribution of it is strictly prohibited. Please inform us immediately and destroy the original transmittal. Thank you for your cooperation.&#8203; </p><p></p><span style="border: 0px; color: rgb(125, 206, 237); font-family: Arial, serif, EmojiFont; font-size: 12px; line-height: 125%; text-align: center;"> <p>Visual BI Solutions</p> </span><p></p><p></p><table border="0" cellpadding="10" cellspacing="0" width="100%"> <tbody> <tr>     </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>` // html body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
            });
        });
    }
});
