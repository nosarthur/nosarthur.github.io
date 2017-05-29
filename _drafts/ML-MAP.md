maximum likelihood and maximum a posteriori methods

## introduction

I worked on medical imaging (specifically, a subfield of magnetic resonance imaging called quantitative susceptibility mapping which aims to calculate magnetic susceptibility) for several years and in this post I am going to give an introduction to two major methods in that field:
maximum likelihood (ML) and maximum a posteriori (MAP) methods.

Often times, medical imaging problems have the same setup as the [deblurring](https://en.wikipedia.org/wiki/Deblurring)
or [denoising](https://en.wikipedia.org/wiki/Noise_reduction) problems in computer vision. One measurement of the system can be
described by the following equation

$$PX= y$$

where $$X$$ is the desired 2D or 3D image, $$P$$ corresponds to the data collecting process, and $$y$$ is the measurement result. 
Usually $$P$$ is some kind of 'projection' that loses information. For example, it could be a 2D projection of a 3D object,
an average filter that causes blurring, etc. Conceptually, one can think of $$X$$ as a column vector (say $$N\times 1$$)
corresponding to the flattened image, $$y$$ is a column vector (say $$M\times 1$$ with $$M\le N$$), and $$P$$ is a fat matrix.
In practice, one may not be able to write $$P$$ explicitly. For example, a 3D image with size 256x256x256 has over 16 million
values, thus a square matrix acting on $$X$$ would have $$2.8\times10^{14}$$ entries.
For the purpose of calculation, writing out $$P$$ explicitly is not required. Only writing out $$PX$$ is needed.

Since $$P$$ is rank-deficient, $$X$$ cannot be solved (same reason that $$x_1+x_2 = 3$$ cannot be solved).
These problems are known as ill-posed [inverse problems](https://en.wikipedia.org/wiki/Inverse_problem).
One obvious way to solve for $$X$$ is to take multiple measurements and stack the $$P$$ matrices and $$y$$ vectors 
in the hope that we get full-rank or  over-determined system of 

$$AX  = b$$.

Then the solution is simply 

$$ X = (A^\dagger A)^{-1} A^\dagger b$$

where $$A^\dagger$$ is the [conjugate transpose](https://en.wikipedia.org/wiki/Conjugate_transpose) of $$A$$.

Image reconstruction of convensional [CT](https://en.wikipedia.org/wiki/CT_scan), [MRI](https://en.wikipedia.org/wiki/Magnetic_resonance_imaging) 
and [super resolution imaging](https://en.wikipedia.org/wiki/Super-resolution_imaging) all follow this approach.

## maximum likelihood (ML)

## maximum a posteriori (MAP)

## more recent development 

* [compressive sensing](https://en.wikipedia.org/wiki/Compressed_sensing)
* [dictionary learning](https://en.wikipedia.org/wiki/Sparse_dictionary_learning)
