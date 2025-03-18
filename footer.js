               document.addEventListener("DOMContentLoaded", function () {
                let lastScrollTop = 0;
                let socialBar = document.getElementById("socialBar");
                let footer = document.querySelector("footer"); // Select the footer
            
                function checkScroll() {
                    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                    let footerOffset = footer.offsetTop; // Get footer position
                    let windowHeight = window.innerHeight;
                    
                    // If the user is scrolling down and near the footer, hide the icons
                    if (currentScroll + windowHeight >= footerOffset) {
                        socialBar.style.opacity = "0";
                        socialBar.style.visibility = "hidden";
                    } else if (currentScroll < lastScrollTop) {
                        // Show the social bar again when scrolling up
                        socialBar.style.opacity = "1";
                        socialBar.style.visibility = "visible";
                    }
            
                    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative values
                }
            
                // Attach the function to scroll event
                window.addEventListener("scroll", checkScroll);
            });
