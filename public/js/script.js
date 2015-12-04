'use strict';

// Client user information
let socket = io();
let myUser;
let token;

const secret = "ihdfioahdfoihasd";

function verifyToken(xhr) {
	if (localStorage.getItem('userToken')) {
		xhr.setRequestHeader('Authorization',
					'Bearer ' + localStorage.getItem('userToken'));
	}
}
