---
layout: post
title: Generalized functions
date:   2017-03-21 13:00:00 -0500
categories: [math and physics]
comments: true
tags: [calculus]
---

Back in graduate school, I had the false impression that I understood generalzied functions by knowing

* $$\frac{d}{dx}H(x) = \delta(x)$$ where $$H(x)$$ is the step function and $$\delta(x)$$ is the [Dirac delta function](https://en.wikipedia.org/wiki/Dirac_delta_function)
* Dirac delta function can be treated as limit of many continuous functions, see [examples here](http://functions.wolfram.com/GeneralizedFunctions/DiracDelta/09/). Thus if needed, we can use the continuous functions for calculations and take the limit at the very end.

While doing my second postdoc at Weill Cornell Medical School, I learned a systematic way to treat singularities, which is the topic of this post.

A convenient example for demonstration is the magnetic dipole field: a current distribution creates a magnetic dipole moment (distribution) which then produces magnetic field. There is a singularity as one approaches the magnetic dipole:

$$\mathbf B(\mathbf r)=\frac{\mu_0}{4\pi}\frac{3\hat r(\hat r\cdot \mathbf\mu)- \mathbf\mu}{r^3} + \frac{2\mu_0}{3}\mathbf\mu\delta(\mathbf r) $$

where I assume that the dipole $$\mathbf \mu$$ is placed at origin, and $$\mathbf r$$ is the observation point.
In Jackson's classical electrodynamics (3rd edition), the magnetic dipole field was derived in a somewhat strange way (p184-188). 
The author first derives the vector potential to be

$$\mathbf A(\mathbf r)= \frac{\mu_0}{4\pi}\frac{\mathbf \mu\times \mathbf r}{r^3} $$

and then gets only the non-singular part of the magnetic field. Then he integrates $$\nabla\times\mathbf A$$ in order to recover the Dirac delta function part. If we do not know the answer before hand, it will be difficult to think of how to recover any missing singular components.

<a target="_blank"  href="https://www.amazon.com/gp/product/047130932X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=047130932X&linkCode=as2&tag=nosarthur2016-20&linkId=1d9fb645ab6215453bb257f43246e64c"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=047130932X&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=047130932X" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

The origin of the singularities is taking derivative of $$\frac{1}{r}$$,
or any term that's more divergent than it. Conventional calculus does not work at the point $$r=0$$.
To remedy it, we need to utilize Cauchy principal value, for example

$$p.v.\frac{1}{r} = \lim_{\epsilon\rightarrow0}\frac{H(r-\epsilon)}{r} $$

The $$p.v.$$ operation excludes the origin which then allows the application of calculus.
Physically, I like to think that below some small dimension $$\epsilon$$, one should use quantum mechanics instead of classical mechanics.

The electrical current for a magnetic dipole $$\mathbf\mu$$ at the coordinate 
origin is described by a distribution characterized by the 
delta distribution derivative

$$\mathbf j(\mathbf r) = \nabla\times \left( \mathbf\mu \delta(\mathbf r)\right).$$

The solution to the vector potential equation $$-\nabla^2\mathbf A=\mu_0\mathbf j$$ is a distribution:

$$\begin{align}
\mathbf A(\mathbf r) = &\frac{\mu_0}{4\pi}\int_{\mathbb R^3}p.v.\left(\frac{1}{|\mathbf r-\mathbf r'|}\right)\mathbf j(\mathbf r')d^3r' \\
    =& \frac{\mu_0}{4\pi}\lim_{\varepsilon\rightarrow0}
    \int_{\mathbb R^3\backslash B(\mathbf r,\varepsilon)}
            \frac{\mathbf j(\mathbf r')}{|\mathbf r-\mathbf r'|}d^3r'
\end{align}$$

Here $$\mathbb R^3$$ is the 3D real space and $$B(\mathbf r,\varepsilon)$$ is a 
spherical ball centered at $$\mathbf r$$ with a radius $$\varepsilon$$. 

Substitute the current into the vector potential we have 

$$\begin{align}
\mathbf A(\mathbf r) = -\frac{\mu_0}{4\pi}\int d^3r' \delta(\mathbf r')\nabla'\times p.v.  \frac{\mathbf \mu}{R},
\end{align}$$

where integration by parts is used and the boundary term vanishes because 
$$\delta(\mathbf r')=0$$ at both the inner boundary 
$$\mathbf r'\in\partial B(\mathbf r, \varepsilon)$$ and outer boundary $$\mathbf r'=\infty$$.
Here $$B(\mathbf r,\varepsilon)$$ denotes a spherical ball centered at $$\mathbf r$$ with
a radius $$\varepsilon$$ and $$\partial B(\mathbf r,\varepsilon)$$ is its boundary.
To carry the calculation further, we need to evaluate 
$$\partial_i p.v.\frac{1}{R}=\lim_{\varepsilon\rightarrow 0}\partial_i\frac{H(R-\varepsilon)}{R}$$, which is 

$$\partial_i \frac{H(R-\varepsilon)}{R}=-\frac{x_i}{R^3} H(R-\varepsilon)
    +\frac{x_i}{R^2} \delta(R-\varepsilon).$$

Here the first term is the classical derivative in the well-defined region
and the second term is a surface contribution. The surface term vanishes
since on the inner boundary of $$\mathbf r'\in\partial B(\mathbf r,\varepsilon)$$ its
integral of a test function $$\varphi(\mathbf R)$$ is 
$$\int\varphi(\mathbf R)\frac{x_i}{R^2}dS'\sim\varphi(\mathbf R)\varepsilon\int_{S2}\hat r_id\Omega=0$$, with $$S_2$$ denoting the sphere and $$\hat r_i$$ as the $$i$$'th
component of unit vector $$\hat r$$ in the Cartesian coordinate. 
Then we have 

$$\mathbf A(\mathbf r) =\frac{\mu_0}{4\pi} \lim_{\varepsilon\rightarrow0}
\int_{\mathbb R^3\backslash B(\mathbf r,\varepsilon)}d^3r'\delta(\mathbf r')
\frac{\mathbf \mu\times R}{R^3}$$

which is 

$$\mathbf A(\mathbf r) = \frac{\mu_0}{4\pi}p.v.\frac{\mathbf \mu\times\hat r}{r^2}.$$

Comparing to the Jackson's result, we again have the extra Cauchy principal value operation.
Similarly, the above derivation also leads to 

$$\mathbf A(\mathbf r)=\frac{\mu_0}{4\pi}\nabla\times p.v.\frac{\mathbf \mu}{r}.$$

To get the corresponding magnetic field, we need to apply the curl derivative to the vector potential. We thus have

$$\mathbf b(\mathbf r) = \frac{\mu_0}{4\pi}\left(\nabla\nabla\cdot p.v.\frac{\mathbf \mu}{r} - \nabla^2 p.v.\frac{\mathbf \mu}{r} \right).$$

Note that 

$$\begin{align}
\partial_i\partial_j p.v. \frac{1}{r} =& p.v.\partial_i\partial_j\frac{1}{r}
    -\lim_{\varepsilon\rightarrow0}\frac{2x_ix_j}{r^4}\delta(r-\varepsilon)
       + \lim_{\varepsilon\rightarrow0}\frac{\partial_i\partial_jH(r-\varepsilon)}{r} 
        \\
        =& p.v.\frac{3x_ix_j-r^2\delta_{ij}}{r^5}-\lim_{\varepsilon\rightarrow0}\frac{x_ix_j}{r^4}\delta(r-\varepsilon).
\end{align}$$

The last term can be evaluated with a test function

$$ \lim_{\varepsilon\rightarrow0}\int_{\mathbb R^3}\frac{x_ix_j}{r^4}
    \delta(r-\varepsilon)\varphi(\mathbf r)d^3r = \varphi(\mathbf 0)\int_{S_2}\hat r_i
    \hat r_j d\Omega = \frac{4\pi}{3}\delta_{ij}\varphi(\mathbf 0). $$

Thus we have 

$$\begin{align}
\nabla^2 p.v.\frac{\mathbf \mu}{r} =& - 4\pi\delta(\mathbf r)\mathbf \mu,  \\
\nabla\nabla\cdot p.v.\frac{\mathbf \mu}{r} =& p.v.\frac{3\mathbf \mu\cdot\hat r \hat r
        - \mathbf \mu}{r^3} - \frac{4\pi}{3}\mathbf \mu\delta(\mathbf r), 
\end{align}$$

which lead to the desired answer

$$\mathbf  b(\mathbf  r) = \frac{\mu_0}{4\pi}p.v.\frac{3\mathbf \mu\cdot\hat r\hat r-\mathbf \mu}{r^3} + \frac{2\mu_0}{3}\mathbf {\mu} \delta(\mathbf r).$$

Again, there is an extra Cauchy principal value operation compared to the Jackson's result. 

