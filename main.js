/*
Ricreiamo un feed social aggiungendo al layout di base fornito,
il nostro script JS in cui:

- Milestone 1 - Analizziamo la struttura dati fornita

- Milestone 2 - Prendendo come riferimento il layout di esempio
presente nell'html, stampiamo i post del nostro feed.

- Milestone 3 - Se clicchiamo sul tasto "Mi Piace"
cambiamo il colore al testo del bottone
e incrementiamo il counter dei likes relativo.

- Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.


BONUS
1. Formattare le date in formato italiano (gg/mm/aaaa)
2. Gestire l'assenza dell'immagine profilo
con un elemento di fallback che contiene le iniziali dell'utente
(es. Luca Formicola > LF).
3. Al click su un pulsante "Mi Piace" di un post,
se abbiamo già cliccato dobbiamo decrementare il contatore 
e cambiare il colore del bottone.
*/

const posts = [
	{
		id: 1,
		content:
			"Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		media: "https://unsplash.it/600/300?image=171",
		author: {
			name: "Phil Mangione",
			image: "https://unsplash.it/300/300?image=15",
		},
		likes: 80,
		created: "2021-06-25",
	},
	{
		id: 2,
		content:
			"Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		media: "https://unsplash.it/600/400?image=112",
		author: {
			name: "Sofia Perlari",
			image: "https://unsplash.it/300/300?image=10",
		},
		likes: 120,
		created: "2021-09-03",
	},
	{
		id: 3,
		content:
			"Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		media: "https://unsplash.it/600/400?image=234",
		author: {
			name: "Chiara Passaro",
			image: "https://unsplash.it/300/300?image=20",
		},
		likes: 78,
		created: "2021-05-15",
	},
	{
		id: 4,
		content:
			"Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		media: "https://unsplash.it/600/400?image=24",
		author: {
			name: "Luca Formicola",
			image: null,
		},
		likes: 56,
		created: "2021-04-03",
	},
	{
		id: 5,
		content:
			"Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		media: "https://unsplash.it/600/400?image=534",
		author: {
			name: "Alessandro Sainato",
			image: "https://unsplash.it/300/300?image=29",
		},
		likes: 95,
		created: "2021-03-05",
	},
];

// declaring DOM and global variables
const parentContainer = document.getElementById("container");
const likedPosts = [];

// iterate on array to generate all posts
posts.forEach((post) => {
	createPost(post);
});

// FUNCTIONS DEFINITION
function createPost(post) {
	// Create HTML structure
	const postElement = document.createElement("div");
	postElement.className = "post";
	parentContainer.appendChild(postElement);

	const postHeader = document.createElement("div");
	postHeader.className = "post__header";
	postElement.appendChild(postHeader);

	const postMeta = document.createElement("div");
	postMeta.className = "post-meta";
	postHeader.appendChild(postMeta);

	const postMetaIcon = document.createElement("div");
	postMetaIcon.className = "post-meta__icon";
	postMeta.appendChild(postMetaIcon);

	// IF profile picture = null then fallback
	if (post.author.image !== null) {
		const profilePic = document.createElement("img");
		profilePic.className = "profile-pic";
		profilePic.src = post.author.image;
		profilePic.alt = post.author.name;
		postMetaIcon.appendChild(profilePic);
	} else {
		const profilePic = document.createElement("span");
		profilePic.className = "profile-pic-default";
		profilePic.innerHTML = makeInitials(post.author.name);
		postMetaIcon.appendChild(profilePic);
	}

	const postData = document.createElement("div");
	postData.className = "post-meta__data";
	postMeta.appendChild(postData);

	const authorName = document.createElement("div");
	authorName.className = "post-meta__author";
	authorName.textContent = post.author.name;
	postData.appendChild(authorName);

	const time = document.createElement("div");
	time.className = "post-meta__time";
	time.innerHTML = reverseDate(post.created);
	postData.appendChild(time);

	const postText = document.createElement("div");
	postText.className = "post__text";
	postText.textContent = post.content;
	postElement.appendChild(postText);

	const postImage = document.createElement("div");
	postImage.className = "post__image";
	postElement.appendChild(postImage);

	const image = document.createElement("img");
	image.src = post.media;
	image.alt = "";
	postImage.appendChild(image);

	const postFooter = document.createElement("div");
	postFooter.className = "post__footer";
	postElement.appendChild(postFooter);

	const likesContainer = document.createElement("div");
	likesContainer.className = "likes js-likes";
	postFooter.appendChild(likesContainer);

	const likesCta = document.createElement("div");
	likesCta.className = "likes__cta";
	likesContainer.appendChild(likesCta);

	const likeButton = document.createElement("a");
	likeButton.className = "like-button js-like-button";
	likeButton.href = "#";
	likeButton.dataset.postid = post.id;
	likesCta.appendChild(likeButton);

	const likeButtonIcon = document.createElement("i");
	likeButtonIcon.className = "like-button__icon fas fa-thumbs-up";
	likeButtonIcon.setAttribute("aria-hidden", "true");
	likeButton.appendChild(likeButtonIcon);

	const likeButtonLabel = document.createElement("span");
	likeButtonLabel.className = "like-button__label";
	likeButtonLabel.textContent = " Mi Piace";
	likeButton.appendChild(likeButtonLabel);

	const likesCounter = document.createElement("div");
	likesCounter.className = "likes__counter";
	likesCounter.innerHTML = `Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone`;
	likesContainer.appendChild(likesCounter);

	// call function to add Event Listener and modify class and likes
	addLikesCtaEventListener(likeButton, post);

	// RETURN HTML POST
	return postElement;
}

// reverse the date from YYYY-MM-DD to DD/MM/YYYY
function reverseDate(oldDate) {
	const arrDate = oldDate.split("-");
	const date = `${arrDate[2]}/${arrDate[1]}/${arrDate[0]}`;
	return date;
}

// addEventListener to likes button
// that toggles "liked" class and increments or decrements the likes
function addLikesCtaEventListener(likeButton, post) {
	likeButton.addEventListener("click", function (event) {
		event.preventDefault();

		likeButton.classList.toggle("like-button--liked");

		document.querySelector(`#like-counter-${post.id}`).textContent =
			post.likes;

		// call function that updates "likedPosts" array
		updateLikedPosts(likeButton, post);
	});
}

// fallback IF author img is null THEN
// creates a string with initials of first and last name
function makeInitials(name) {
	const arrName = name.split(" ");
	const initFirst = arrName[0].charAt(0);
	const initLast = arrName[1].charAt(0);
	const nameInit = `${initFirst}${initLast}`.toUpperCase();
	return nameInit;
}

// Check "liked" class to increment likes and add element to likedArray
// push liked posts in the second array (likedPosts)
// and removes them if unliked
function updateLikedPosts(likeButton, post) {
	if (likeButton.classList.contains("like-button--liked")) {
		post.likes++;
		likedPosts.push(post);
	} else {
		post.likes--;
		likedPosts.splice(likedPosts.indexOf(post), 1);
	}
}
