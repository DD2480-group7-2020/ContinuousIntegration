import unittest
import json
import main

class LICTestCase(unittest.TestCase):

    """
    Test case for euclidean_dist function in module 'main'
    """
    def test_euclidean_dist(self):
        p1 = [0,0];
        p2 = [0,5];
        self.assertTrue(main.euclidean_dist(p1, p2) == 5);
        p1 = [0,0];
        p2 = [-3,4];
        self.assertTrue(main.euclidean_dist(p1, p2) == 5);
        p1 = [0,0];
        p2 = [0,0];
        self.assertTrue(main.euclidean_dist(p1, p2) == 0);
        p1 = [-10,0];
        p2 = [0,0];
        self.assertTrue(main.euclidean_dist(p1, p2) == 10);


    """
    Test case for get_length function in module 'main'
    """
    def test_get_length(self):
        main.POINTS = [[0,0], [0,5]]
        self.assertTrue(main.get_length(0) == 5);
        main.POINTS = [[0,0], [0,0], [-3,4]]
        self.assertTrue(main.get_length(1) == 5);
        main.POINTS = [[0,0], [0,0]]
        self.assertTrue(main.get_length(0) == 0);

    """
    Test case for triangle_area function in module 'main'
    """
    def text_triangle_area(self):
        main.POINTS = [[0,0], [0,5], [0, 10]]
        self.assertTrue(main.triangle_area(0,1,2) == 0);
        main.POINTS = [[0,0], [0,10], [10,10]]
        self.assertTrue(main.triangle_area(0,1,2) == 5);
        main.POINTS = [[0,0], [0,-10], [5,5], [10,-10]]
        self.assertTrue(main.triangle_area(0,1,3) == 5);

    """
    Test case for can_be_contained_circle function in module 'main'
    """
    def test_can_be_contained_circle(self):
        p1 = [0, 0]
        p2 = [0, 1]
        p3 = [0, 2]
        r = 1
        self.assertTrue(main.can_be_contained_circle(p1, p2, p3, r));
        p1 = [0, 0]
        p2 = [0, 10]
        p3 = [1, 5]
        r = 5
        self.assertTrue(main.can_be_contained_circle(p1, p2, p3, r));
        p1 = [0, 0]
        p2 = [0, 0]
        p3 = [3, -4]
        r = 2.5
        self.assertTrue(main.can_be_contained_circle(p1, p2, p3, r));

    """
    Test case for dist_to_line function in module 'main'
    """
    def test_dist_to_line(self):
        # contract: The dist_to_line function should return the distance between a line defined by p1 and p2,
        # and a third point p3.
        p1 = (3, 3)
        p2 = (-3, -3)
        p3 = (0, 5)
        self.assertEqual(round(main.dist_to_line(p1, p2, p3), 1), 3.5)

        p1 = (15, 7)
        p2 = (1, 0)
        p3 = (0, 0)
        self.assertEqual(round(main.dist_to_line(p1, p2, p3), 1), 0.4)

    """
    Test case for LIC0 function in module 'main'
    """
    def test_LIC0(self):
        # contract: The LIC0 function should return true if it is satisfied, else it returns false
        main.PARAMETERS_T["LENGTH1"] = 30
        main.POINTS = [
            (0, 0), (1, -1), (3, 6), (1, 1),
            (1, 3), (2, 2), (-9, -5), (-1, -5),
            (2, 3), (-1, -5), (0, -2), (2, 2)]
        main.NUMPOINTS = len(main.POINTS)

        self.assertFalse(main.LIC0())

        main.PARAMETERS_T["LENGTH1"] = 17
        main.POINTS = [
            (0, 0), (1, -1), (3, 6), (1, 1),
            (1, 3), (2, 2), (-1, -5), (-1, -5),
            (2, 3), (-1, -5), (0, 0), (8, 15)]

        self.assertFalse(main.LIC0())

        main.POINTS = [
            (0, 0), (1, -1), (3, 6), (1, 1),
            (1, 3), (2, 2), (-9, -5), (-1, -5),
            (2, 3), (-1, -5), (0, 0), (8, 15.1)]

        self.assertTrue(main.LIC0())

    """
    Test case for LIC1 function in module 'main'
    """
    def test_LIC1(self):
        # contract: The LIC1 function should return true if it is satisfied, else it returns false
        # Testing an acute triangle
        main.RADIUS1 = 2.8
        # Smallest circumradius should be about 2.75
        main.POINTS = [(1,2),(4,2),(3,7)]
        main.NUMPOINTS = 3
        self.assertFalse(main.LIC1())
        main.RADIUS1 = 2.5
        self.assertTrue(main.LIC1())

        # Testing a right triangle
        # Smallest circumradius should be about 1.41
        main.POINTS = [(-2, -2),(-4,-2),(-2, -4)]
        main.RADIUS1 = 1.4
        self.assertTrue(main.LIC1())
        main.RADIUS1 = 1.5
        self.assertFalse(main.LIC1())

        # Testing am obtuse triangle
        # Smallest circumradius should be about 2.8
        main.POINTS = [(-2, -2), (-1, 1), (2,2)]
        main.RADIUS1 = 2.7
        self.assertTrue(main.LIC1())
        main.RADIUS1 = 2.9
        self.assertFalse(main.LIC1())

    """
    Test case for LIC2 function in module 'main'
    """
    def test_LIC2(self):
        # contract: The LIC2 function should return true if it is satisfied, else it returns false
        main.EPSILON = 0.5
        main.POINTS = [
            (0, 0), (1, -1)]
        main.NUMPOINTS = len(main.POINTS)

        self.assertFalse(main.LIC2())

        main.EPSILON = 0.87
        main.POINTS = [
            (2, 3), (1, 4), (0, 0), (3, 3)]
        main.NUMPOINTS = len(main.POINTS)
        self.assertTrue(main.LIC2())

        main.EPSILON = 0.2
        main.POINTS = [
            (0, 1), (0, 0), (0, -1)]
        main.NUMPOINTS = len(main.POINTS)
        self.assertFalse(main.LIC2())

        main.EPSILON = 0.2 # Tests invalid angle
        main.POINTS = [
            (1, 1), (0, 0), (0, 0)]
        main.NUMPOINTS = len(main.POINTS)
        self.assertFalse(main.LIC2())

    """
    Test case for LIC3 function in module 'main'
    """
    def test_LIC3(self):
        # contract: The LIC3 function should return true if it is satisfied, else it returns false
        main.AREA1 = 1
        main.POINTS = [[0,0],[1,0],[1,2]] # ==> area = 1
        main.NUMPOINTS = len(main.POINTS)

        self.assertTrue(main.LIC3())
        main.AREA1 = 0
        self.assertFalse(main.LIC3())

        main.POINTS = [[0,0],[1,0],[1,100]] # ==> area = 50
        main.AREA1 = 51
        self.assertTrue(main.LIC3())
        main.AREA1 = 49
        self.assertFalse(main.LIC3())

    """
    Test case for LIC4 function in module 'main'
    """
    def test_LIC4(self):
        # contract: The LIC4 function should return true if it is satisfied, else it returns false
        main.Q_PTS = 4
        main.QUADS = 2
        main.POINTS = [
            (7, 8), (-12, 19), (-12, -22), (51, 91),
            (42, 85), (62, 32), (79, 15), (11, 95),
            (2, 73), (70, 50), (60, 32), (28, 24),
            (60, 29), (14, 59), (97, 71), (60, 45),
            (21, 17), (8, 49), (93, 74), (18, 66),
            (23, 26), (25, 44), (78, 40), (31, 25),
            (47, 84), (5, 56), (99, 34), (23, 26)]
        main.NUMPOINTS = len(main.POINTS)

        self.assertTrue(main.LIC4())

        main.Q_PTS = 3
        main.QUADS = 2
        main.POINTS = [
            (7, 8), (-12, 19), (-12, 22), (51, 91),
            (42, 85), (62, 32), (79, 15), (11, 95),
            (2, 73), (-70, -50), (60, -32), (28, 24),
            ]
        main.NUMPOINTS = len(main.POINTS)
        self.assertTrue(main.LIC4())

        main.QUADS = 3
        self.assertFalse(main.LIC4())

        main.Q_PTS = 1
        self.assertFalse(main.LIC4())

    """
    Test case for LIC5 function in module 'main'
    """
    def test_LIC5(self):
        # contract: The LIC5 function should return true if it is satisfied, else it returns false
        main.POINTS = [
            (0, 0), (1, -1), (3, 6), (3, 1)]
        main.NUMPOINTS = len(main.POINTS)

        self.assertFalse(main.LIC5())

        main.POINTS = [
            (0, 0), (1, -1), (3, 6), (2, 1)]
        self.assertTrue(main.LIC5())

    """
    Test case for LIC6 function in module 'main'
    """
    def test_LIC6(self):
        # contract: The LIC6 function should return true if it is satisfied, else it returns false
        main.N_PTS = 3
        main.NUMPOINTS = 4
        main.DIST = 2
        main.POINTS = [(0, 0), (2, 2), (-1, 2), (-2,-3)]
        self.assertTrue(main.LIC6())

        main.DIST = 5.5
        self.assertFalse(main.LIC6())


        main.N_PTS = 4
        main.NUMPOINTS = 4
        main.DIST = 29
        main.POINTS = [(-10, -10), (5, 5), (10, 10), (-10, -10)]
        self.assertFalse(main.LIC6())

        main.DIST = 28
        main.POINTS = [(-10, -10), (5, 5), (10, 10), (-10, -10)]
        self.assertTrue(main.LIC6())

    """
    Test case for LIC7 function in module 'main'
    """
    def test_LIC7(self):
        # contract: The LIC7 function should return true if it is satisfied, else it returns false
        main.LENGTH1 = 1 # Tests NUMPOINTS < 3
        main.K_PTS = 1
        main.POINTS = [
            (0, 0), (2, 2)]
        main.NUMPOINTS = len(main.POINTS)
        self.assertFalse(main.LIC7())

        main.LENGTH1 = 1
        main.K_PTS = 2
        main.POINTS = [
            (0, 0), (2, 2), (0, 0), (3, 3)]
        main.NUMPOINTS = len(main.POINTS)
        self.assertTrue(main.LIC7)

        main.LENGTH1 = 2
        main.K_PTS = 2
        main.POINTS = [
            (0, 0), (2, 2), (0, 0), (3,3)]
        main.NUMPOINTS = len(main.POINTS)
        self.assertFalse(main.LIC7())

    """
    Test case for LIC8 function in module 'main'
    """
    def test_LIC8(self):
        # contract: The LIC8 function should return true if it is satisfied, else it returns false
        main.RADIUS1 = 0
        main.POINTS = [[0,0],[-1,-1],[-1,-1],[1,0],[1,2]]
        main.NUMPOINTS = len(main.POINTS)
        main.A_PTS = 3
        main.B_PTS = 1
        self.assertTrue(main.LIC8())
        main.RADIUS1 = 2
        self.assertFalse(main.LIC8())

    """
    Test case for LIC9 function in module 'main'
    """
    def test_LIC9(self):
        # contract: The LIC9 function should return true if it is satisfied, else it returns false
        main.POINTS = [
            (3, 3), (-12, 19), (1, 1),
            (51, 91), (1, 3), (99, 99)
            ]
        main.NUMPOINTS = len(main.POINTS)
        main.C_PTS = 1
        main.D_PTS = 1
        main.EPSILON = 2.1
        main.PI = 3.1415926535
        self.assertTrue(main.LIC9())

        main.EPSILON = 4
        self.assertFalse(main.LIC9())

        main.EPSILON = 2.1
        main.D_PTS = 3
        self.assertFalse(main.LIC9())

    """
    Test case for LIC10 function in module 'main'
    """
    def test_LIC10(self):
        # contract: The LIC10 function should return true if it is satisfied, else it returns false
        main.PARAMETERS_T["E_PTS"] = 1
        main.PARAMETERS_T["F_PTS"] = 1
        main.PARAMETERS_T["AREA1"] = 0
        main.POINTS = [
            (0, 0), (1, -1), (0, 0), (3, 1), (0, 0)]
        main.NUMPOINTS = len(main.POINTS)

        self.assertFalse(main.LIC10())

        main.PARAMETERS_T["AREA1"] = 18
        main.POINTS = [
            (0, 0), (1, -1), (0, 6), (2, 1), (6.01, 0)]

        self.assertTrue(main.LIC10())

    """
    Test case for LIC11 function in module 'main'
    """
    def test_LIC11(self):
        # contract: The LIC11 function should return true if it is satisfied, else it returns false
        main.G_PTS = 7
        main.NUMPOINTS = 10
        main.POINTS = [(0, 0), (1, 5), (4, -1), (5, 1), (7, -10), (10, -31), (13, 0), (15, -3), (27, -7), (31, 1)]
        self.assertFalse(main.LIC11())

        main.G_PTS = 6
        main.NUMPOINTS = 10
        main.POINTS = [(0, 0), (1, 5), (4, -1), (5, 1), (7, -10), (10, -31), (13, 0), (0, -3), (15, -7), (31, 1)]
        self.assertFalse(main.LIC11())

    """
       Test case for LIC12 function in module 'main'
    """
    def test_LIC12(self):
        # contract: The LIC12 function should return true if it is satisfied, else it returns false
        main.LENGTH1 = 1
        main.LENGTH2 = 1
        main.K_PTS = 1
        main.POINTS = [
            (0, 0), (1, -1)]
        main.NUMPOINTS = len(main.POINTS)

        self.assertFalse(main.LIC12())

        main.LENGTH1 = 1
        main.LENGTH2 = 4
        main.K_PTS = 2
        main.POINTS = [
            (0, 0), (0, 0), (0, 0), (3, 3)]
        main.NUMPOINTS = len(main.POINTS)

        self.assertTrue(main.LIC12())

        main.LENGTH1 = 1
        main.LENGTH2 = 1
        main.K_PTS = 1
        main.POINTS = [
            (0, 0), (2, 2), (0, 0), (3,3)]
        main.NUMPOINTS = len(main.POINTS)
        self.assertFalse(main.LIC12())

        main.LENGTH1 = 5
        main.LENGTH2 = 5
        main.K_PTS = 1
        main.POINTS = [
            (0, 0), (2, 2), (0, 0), (3, 3)]
        main.NUMPOINTS = len(main.POINTS)
        self.assertFalse(main.LIC12())

    """
    Test case for LIC13 function in module 'main'
    """
    def test_LIC13(self):
        # contract: The LIC13 function should return true if it is satisfied, else it returns false
        main.RADIUS1 = 0
        main.RADIUS2 = 0
        main.POINTS = [[0,0],[-1,-1],[-1,-1],[1,0],[1,2]]
        main.NUMPOINTS = len(main.POINTS)
        main.A_PTS = 3
        main.B_PTS = 1
        self.assertFalse(main.LIC13())
        main.RADIUS2 = 10
        self.assertTrue(main.LIC13())

    """
       Test case for LIC14 function in module 'main'
    """
    def test_LIC14(self):
        # contract: The LIC14 function should return true if it is satisfied, else it returns false
        main.E_PTS = 1
        main.F_PTS = 1
        main.NUMPOINTS = 5

        self.assertFalse(main.LIC14())

        main.POINTS = [
                (3, 3), (-12, 19), (1, 1),
                (51, 91), (1, 3), (99, 99)
            ]
        main.NUMPOINTS = len(main.POINTS)
        main.AREA1 = 4
        main.AREA2 = 400

        self.assertTrue(main.LIC14())

        main.AREA2 = 3000
        self.assertFalse(main.LIC14())

    """ Test for twelvefirst helper function
    """
    def test_twelvefirst(self):
        # contract: The LIC14 function should return true if it is satisfied, else it returns false
        main.LENGTH1 = 1
        main.K_PTS = 2
        main.POINTS = [
            (0, 0), (0, 0), (0, 0), (3, 3)]
        main.NUMPOINTS = len(main.POINTS)
        self.assertTrue(main.twelvefirst())
        main.LENGTH1 = 8
        main.K_PTS = 2
        main.POINTS = [
            (0, 0), (0, 0), (0, 0), (3, 3)]
        main.NUMPOINTS = len(main.POINTS)
        self.assertFalse(main.twelvefirst())
    """ 
	Test for twelvesecond helper function
	"""
    def test_twelvesecond(self):
        # contract: The LIC14 function should return true if it is satisfied, else it returns false
        main.LENGTH2 = 10
        main.K_PTS = 2
        main.POINTS = [
            (0, 0), (0, 0), (0, 0), (3, 3)]
        main.NUMPOINTS = len(main.POINTS)
        self.assertTrue(main.twelvesecond())
        main.LENGTH2 = 1
        main.K_PTS = 2
        main.POINTS = [
            (0, 0), (0, 0), (0, 0), (3, 3)]
        main.NUMPOINTS = len(main.POINTS)
        self.assertFalse(main.twelvefirst())

if __name__ == '__main__':
    unittest.main()
